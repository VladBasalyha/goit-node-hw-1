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
			return contactId == elem.id ? elem : null;
		});
		console.log(data);
	} catch (err) {
		console.log(`${err} error!`);
	}
}

async function removeContact(contactId) {
	const contactsList = await listContacts();
	const index = await contactsList.findIndex(
		(contact) => contactId == contact.id
	);
	const deleteContact = await contactsList.splice(index, 1);
	console.log(contactsList);
}

async function addContact(name, email, phone) {
	try {
		const contactsList = await listContacts();
		const newContact = {
			id: Math.random(),
			name,
			email,
			phone,
		};
		contactsList.push(newContact);
		console.log(contactsList);
		await fs.writeFile("contacts.json", JSON.stringify(newContact));
		return console.table(newContact);
	} catch (err) {
		console.log(`${err} error`);
	}
}

addContact("Vlad", "123@ukr.net", "432431312");
