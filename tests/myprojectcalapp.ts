const assert = require('assert');
const anchor = require('@coral-xyz/anchor');
const {SystemProgram} = anchor.web3;

// Macha Will Start testing from describe 
// main method where we can write all the test cases
describe('myprojectcalapp', () => {
    // Step 1: Need Provider 
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);
    // Step 2: Generate Keypair for Calculator Program
    const calculator = anchor.web3.Keypair.generate(); 

    // Step 3: Program abstruction to allow to call the method
    const program = anchor.workspace.Myprojectcalapp;

    // Step 4: Testing to the process
    it('Create a calculator', async() => {
        // Params : Context, 'init_message'
        await program.rpc.create("Welcome to Solana", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.greeting === 'Welcome to Solana');
    })

    it('Add two numbers', async() => {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(5)));
    })

    // IMPLEMENT Subtraction function
    it('Subtraction two numbers', async() => {
        await program.rpc.sub(new anchor.BN(5), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(3)));
    })

    // IMPLEMENT Multiplication function
    it('Multipication two numbers', async() => {
        await program.rpc.mul(new anchor.BN(2), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(4)))
    })

    // IMPLEMENT Division function
    it('Multipication two numbers', async() => {
        await program.rpc.div(new anchor.BN(4), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(2)))
    })

});





