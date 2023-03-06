const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
	try {
		const data = await (await fs.readFile(contactsPath)).toString();
		return JSON.parse(data);
	} catch (err) {
		console.log(err);
	}
}

async function getContactById(contactId) {
	try {
		const contactsList = await listContacts();
		const data = await contactsList.find((elem) => {
			return contactId == elem.id ?? elem;
		});
		if (data === undefined) {
			console.log("seems, there is no contacts by this id");
			return;
		}
		console.table(data);
	} catch (err) {
		console.log(`${err} error!`);
	}
}

async function removeContact(contactId) {
	const contactsList = await listContacts();
	const index = await contactsList.findIndex(
		(contact) => contactId == contact.id
	);
	if (index === -1) {
		console.log("No contact by this id. Please, type corects identificator");
		return;
	}
	contactsList.splice(index, 1);
	console.table(contactsList);
	await fs.writeFile(contactsPath, JSON.stringify(contactsList));
}

async function addContact(name, email, phone) {
	const newContact = {
		id: Math.random().toString(),
		name,
		email,
		phone,
	};
	try {
		const contactsList = await listContacts();
		contactsList.push(newContact);
		await fs.writeFile("db/contacts.json", JSON.stringify(contactsList));
		console.table(contactsList);
	} catch (err) {
		console.log(`${err} error`);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
