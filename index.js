const contactsFunctions = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
    const {getContactById, listContacts} = contactsFunctions
	switch (action) {
		case "list":
			listContacts();
			break;

		case "get":
			getContactById(id)
			break;

		case "add":
			contactsFunctions.
			break;

		case "remove":
			// ... id
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}
invokeAction(argv);
