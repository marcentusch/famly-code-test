# Backend Technical Challenge

This challenge forms the basis for a conversation about how you approach development and balance tradeoffs. The parts in the challenge are issues you might encounter as a Famly engineer in your day-to-day work.

**Time expectations:**

- We don't want to take too much of your time, so we don't expect you to use more than 2 hours on these challenges.
- Don’t worry too much about getting stuck on one of the assignments or running out of time. In that case, we can discuss potential solutions and challenges during the follow-up meeting :)

**Solution expectations:**

- Make sure to read through the whole README to get an overview.
- You can use any language you want to use (Scala, Haskell, Java, JavaScript, Python, ...)
- You can change as much as you want, we will go through the choices together.
- If you get stuck, or you think there’s something that doesn’t make sense, please don’t hesitate to reach out!


**If you want to detail anything about your solution, include it here:**
<!-- START of your notes on the solution -->


<!-- END of Notes -->

## Overview

- [Assignment](#assignment)
  - [Part 1: In-App Messaging](#part-1-in-app-messaging)
  - [Part 2: Child Check-ins](#part-2-child-check-ins)
- [Database](#database)

## Assignment

### Part 1: In-App Messaging

**Specification**: Famly has an in-app messaging system, where nursery staff and parents can contact each other. Imagine that this system is modeled using the simple table defined in `db/migrations.sql`.

A single `conversation` between multiple users is modeled as multiple rows with the same ​`id`​ in the `conversation` table. Once for each user in the conversation.

Given the tables specified in `db/migrations.sql`, write the following SQL queries:

1. All messages in any `conversation` sent by the user with user ID `4`
2. All messages in `conversation` where users 1 and 3 are participating (other users
could also be participating)
3. All messages in any `conversation` where the message contents include the word
"cake"

You can put these 3 queries into the `db/` folder.

### Part 2: Child Check-ins

**Specification**: In Famly, keeping track of which children are present in your nursery is an important daily task. Every time a child arrives at the nursery, a staff member ​checks in​ the child using Famly. Whenever a child leaves for the day, that child is ​checked out​. We would like you to write the underlying code to handle these check ins and check outs.

You can write this in any language you are familiar with (Scala, Haskell, Java, JavaScript, Python, ...) or pseudo-code.

A child is represented by a class/struct that might look like this:

```
class Child {
  id: Int,
  name: String
}
```

We want you to implement this functionality:

1. Checking a child in.
2. Checking a child out.
3. Listing the names of all children that are currently checked in.
4. Getting a list of children that was checked in for at least 2 hours today.
5. Write at least one test for your solution


To help limit the scope of this:

- You do not need to worry about timezones, just imagine that everything will always be UTC.
- You decide how you model the state - you can do it as a simple in-memory list or pretend you have a SQL database or other data store available.
- You do not need to worry about UI or server/routing, only the business logic. This could be as simple as three functions and a global mutable list of checked in children.
- For testing, you can use a test framework you know or just a simple function that calls your code and returns a boolean if the actual result match the expected result.


## Database

You can run the Docker command below, from inside the `challenge/` folder, to spin up a MySQL instance in Docker:

```bash
$ cd challenge
$ docker run \
   --name challenge-mysql \
   --rm \
   --env MYSQL_ROOT_PASSWORD=root \
   -p 3306:3306 \
   --mount type=bind,source=$(pwd)/db/migrations.sql,target=/docker-entrypoint-initdb.d/migrations.sql \
   mysql:5.7
```

You can then connect to it on:
- **Hostname**: `127.0.0.1`
- **Port**: `3306`
- **Username**: `root`
- **Password**: `root`

This will set up the tables specified in `db/migrations.sql`.
