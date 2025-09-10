use anchor_lang::prelude::*;

declare_id!("5atHpoigsMbsWcyTkJwC5rwYG7h3aawHj1y8YVmjPQXu");

// Solana Program can't store data

#[program]
pub mod myprojectcalapp {
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;
    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx: Context<Additional>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }

    // IMPLEMENT Subtraction function
    pub fn sub(ctx: Context<Subtraction>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 - num2;
        Ok(())
    }

    // IMPLEMENT Multiplication function
    pub fn mul(ctx: Context<Multipication>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 * num2;
        Ok(())
    }

    // IMPLEMENT Division function


}

#[derive(Accounts)]
pub struct Multipication<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>
}

#[derive(Accounts)]
pub struct Subtraction<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>
}

#[derive(Accounts)]
pub struct Additional<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=264)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub reminder: i64
}

