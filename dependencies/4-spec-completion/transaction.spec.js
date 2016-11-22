var Transaction = require(process.env.transaction || "../3-implementation/transaction");
var BankAccount = require("../bank-account");


describe("A new transaction", function() {
	beforeEach(function() {
		spyOn(Date, 'now').andReturn(new Date("2016-11-22T09:49:51.010Z"));

		this.accountA = new BankAccount();
		this.accountA.balance = 100;

		this.accountB = new BankAccount();
		this.accountB.balance = 25;

		this.transaction = new Transaction(this.accountA, this.accountB, 25);
	});

	it("has transaction date 2016-11-22T09:49:51.010Z", function() {
		expect(this.transaction.date).toEqual(new Date("2016-11-22T09:49:51.010Z"));
	});

	it("has an amount of 25", function() {
		expect(this.transaction.amount).toBe(25);
	});

	it("is not yet completed", function() {
		expect(this.transaction.completed).toBe(false);
	});


	describe("executed", function() {
		beforeEach(function() {
			spyOn(this.accountA, 'withdraw');
			spyOn(this.accountB, 'deposit');
			this.transaction.execute();
		});

		it("withdraws 25 from account A", function() {
			expect(this.accountA.withdraw).toHaveBeenCalledWith(25);
		});

		it("deposits 25 to account B", function() {
			expect(this.accountB.deposit).toHaveBeenCalledWith(25);
		});

		it("is completed", function() {
			expect(this.transaction.completed).toBe(true);
		});
	});
});