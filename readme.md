# CMS Backend

---

## Prerequisites

What do I need to run this project?

- [Node](https://nodejs.org/en/)
- [mongodb](https://docs.mongodb.com/guides/server/install/)

## Running the project

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
