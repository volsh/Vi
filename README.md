please run the project by starting the node server in the /server directory (npm run dev). it will be available at http://localhost:3000.
and the client with the same command. it should be available at http://localhost:5173.
you can also run the prisma studio to see the live data with the command npx prisma studio at the /server directory and connecting to http://localhost:5555.

notice that I put a lot of emphasise on right patterns, best practices etc, resulting in some features I didn't quite make it to like the Recoil.

I am updating the data through a persistant DB (sqlite) which I migrated the json file to. it's located in a file called dev.db and I used prisma for ORM.

I also only implemented the status filter and not for the other fields because I didn't have time, but the skelaton of this feature is there. it only needs to be implenented on specific fields and use cases

in the page /tasks you can see a list of tasks that are fetch from the DB on load. they can be sorted and (partially) filtered.
you can delete tasks from the table in bulk by selecting rows and click on the delete icon.
on task click a form will open in a modal allowing us to update the task.
On the left blue corner there's an add button which opens a create task form.
