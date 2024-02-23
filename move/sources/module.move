module module_addr::main {

    const APP_OBJECT_SEED: vector<u8> = b"APTOGOTCHI";
    const COLLECTION_NAME: vector<u8> = b"Aptogotchi Collection";
    const COLLECTION_DESCRIPTION: vector<u8> = b"Aptogotchi Collection Description";
    const COLLECTION_URI: vector<u8> = b"https://otjbxblyfunmfblzdegw.supabase.co/storage/v1/object/public/aptogotchi/aptogotchi.png";

    use std::option;
    use std::signer::address_of;
    use std::string;
    use std::string::String;
    use aptos_std::string_utils::{to_string};
    use aptos_framework::object;
    use aptos_framework::object::ExtendRef;
    use aptos_token_objects::collection;
    use aptos_token_objects::token;
    use aptos_token_objects::token::Token;

    // Tokens require a signer to create, so this is the signer for the collection
    struct CollectionCapability has key {
        creator_extend_ref: ExtendRef,
    }

    // This function is only callable during publishing of the module
    fun init_module(my_module_signer: &signer){
        // Create a new named Object
        // generates an address from the provided seed and creator address.
        // This is a deterministic address that can be queried globally if the seed is known
        let creator_constructor_ref = object::create_named_object(
            my_module_signer,
            APP_OBJECT_SEED,
        );

        // create a ref that acts as the signer and storing the ExtendRef for it
        // so later we can use it to mint a nft
        let creator_extend_ref = object::generate_extend_ref(&creator_constructor_ref);

        // // Generates the object Signer. Only the signer can modify the object
        // // Converts the extend_ref to a signer type so we can use it to sign on create collection

        let creator_signer = &object::generate_signer(&creator_constructor_ref);

        // // extend_ref and app_signer are technically the same thing. But since we can not
        // // store an app_signer, we store the extend_ref so we can later use it to modify the object
        // // Move the generated extend_ref to be under the generated app_signer
        // // and store it in this module struct so later we can use it

        move_to(creator_signer, CollectionCapability {
            creator_extend_ref,
        });

        
        // Since a token must be in a Collection, we first create the collection
        // when the module is published and use the module owner to sign the create collection transaction
        create_collection(creator_signer);
    }

    // Create the collection that will hold all the NFTs
    fun create_collection(creator: &signer){

        // Required collection metadata
        let description = string::utf8(COLLECTION_DESCRIPTION);
        let name = string::utf8(COLLECTION_NAME);
        let uri = string::utf8(COLLECTION_URI);

        // Create an unlimited supply collection
        collection::create_unlimited_collection(
            creator,
            description,
            name,
            option::none(), // royalty
            uri,
        );
    }

    public entry fun mint_nft(user: &signer) acquires CollectionCapability {

        // Contruct the token name from the user signer address
        // This is a specific design decision for this example and should not be encouraged.
        // We do it here so later it would be easy for us to retrieve the
        // user nft (based on the account address) without using Indexer. Downside is
        // that a user can only have 1 nft since a nft name is unique

        let user_addr = address_of(user);
        let token_name = to_string(&user_addr);

        // Minting a token requires the (collection) creator signer
        // Derives the creator signer object address. The creator signer is the stored extend_ref
        // can use its ExtendRef to generate the creator signer
        // get an address
        let creator_signer_address = object::create_object_address(&@module_addr, APP_OBJECT_SEED);
        let creator_extend_ref = &borrow_global<CollectionCapability>(creator_signer_address).creator_extend_ref;
        let creator_signer = object::generate_signer_for_extending(creator_extend_ref);

        // Creates a new token object from a token name and returns the ConstructorRef for
        // additional specialization.
        let constructor_ref = token::create_named_token(
            &creator_signer,
            string::utf8(COLLECTION_NAME),
            string::utf8(COLLECTION_DESCRIPTION),
            token_name,
            option::none(), // royalty
            string::utf8(COLLECTION_URI)
        );

        // generate a transfer ref - the ref owner can transfer the token object
        let transfer_ref = object::generate_transfer_ref(&constructor_ref);

        // Assign the transaction signer as the owner of the token object
        object::transfer_with_ref(object::generate_linear_transfer_ref(&transfer_ref), address_of(user));
    }

    // Returns true if this address owns a nft
    #[view]
    public fun has_nft(owner_addr: address): (bool) {
        let token_address = get_nft_address(owner_addr);
        let has_token = object::object_exists<Token>(token_address);

        has_token
    }

    // Get reference to NFT token object (CAN'T modify the reference)
    #[view]
    fun get_nft_address(user_addr: address): (address) {
        let collection = string::utf8(COLLECTION_NAME);
        let token_name = to_string(&user_addr);
        let creator_address = object::create_object_address(&@module_addr, APP_OBJECT_SEED);
        let token_address = token::create_token_address(
            &creator_address,
            &collection,
            &token_name,
        );

        token_address
    }

    // Returns the NFT name
    #[view]
    public fun get_nft(
        user_addr: address
    ): (String) {

        let token_address = get_nft_address(user_addr);
        let token_obj = object::address_to_object<Token>(token_address);
        let token_name = token::name(token_obj);
        // view function can only return primitive types.
        (token_name)
    }
}
