const contactsService = require("./contacts");
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

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsService.listContacts();
      break;

    case "get":
      const contact = await contactsService.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const delContact = await contactsService.removeContact(id);
      console.log(delContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
