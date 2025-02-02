use web3::transports::Http;
use web3::types::{Address, TransactionRequest, U256};
use web3::Web3;
use std::str::FromStr;
use dotenv::dotenv;
use std::env;
use web3::signing::{Key, SecretKey};
use web3::contract::{Contract, Options};

#[tokio::main]
async fn main() -> web3::Result<()> {
    dotenv().ok();
    
    let http = Http::new(&env::var("INFURA_URL").unwrap())?;
    let web3 = Web3::new(http);

    let contract_address: Address = "0xYourContractAddress".parse().unwrap();
    let contract_abi = include_bytes!("SimplePoints.json");

    let user_address: Address = "0xYourEthereumAddress".parse().unwrap();
    let private_key: SecretKey = SecretKey::from_str(&env::var("PRIVATE_KEY").unwrap()).unwrap();

    let contract = Contract::from_json(web3.eth(), contract_address, contract_abi)?;

    let earn_tx = contract
        .call("earnPoints", (U256::from(10),), user_address, Options::default())
        .await?;

    println!("Transaction receipt: {:?}", earn_tx);

    let points: U256 = contract
        .query("getPoints", (), user_address, Options::default(), None)
        .await?;

    println!("User Points: {}", points);

    Ok(())
}
