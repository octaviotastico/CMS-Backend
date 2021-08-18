# CMS Backend

---

## Prerequisites

What do I need to run this project?

- [Node](https://nodejs.org/en/)
- [mongodb](https://docs.mongodb.com/guides/server/install/)

## Running the project

How do I run it?

To install the dependencies:
```
npm i
```
After dependencies are installed:
```
npm start
```

And that's all folks.

## Troubleshooting

What could go wrong?

- mongodb installed but not running.

To check that, run this command:

```
sudo systemctl status mongodb
```
If the output is not something like this:
```
Active: active (running) since Mon 2021-08-16 15:53:26 -03; 1 day 11h ago
```
Then, it is not running. To make it run (once), do:
```
sudo systemctl start mongodb
```
If you also want to make it run every time your computer starts, do:
```
sudo systemctl enable mongodb
```

## Some notes about the project

What do we want to achieve with this backend? Why do we need a backend at all? [Where are your fingers?](https://www.youtube.com/watch?v=UMwEbsbLw3k)

This backend is important because you not only need to store data from the frontends in the local database, but you also have to broadcast that information among all the other nodes in the DTN, using the uD3TN protocol with each `POST` request, so users can access all the data created anywhere on the planet or in the solar system 👀.

You can directly talk to another instance of the DTN by using the `/aap` endpoint.

Another easy use case, would be to store articles written in markdown with images and all using the `/learning` endpoint.

I'm still trying to figure out how to make a videocall xD but they'll be coming soon. I promise.

## TODO

- Create more endpoints (user, profile, meetings, etc).
- Organize articles better.
- Ping to eids to check how much time it takes to reach them.
- Create a map of eids???
- Stream video over the network :)
