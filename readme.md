# CMS Backend

---

## Prerequisites

What do I need to run this project?

- [Node](https://nodejs.org/en/)
- [mongodb](https://docs.mongodb.com/guides/server/install/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) (if you want to)

## Running the project

To install the dependencies:

```
yarn
```
or
```
npm i
```

After dependencies are installed:

```
yarn start
```
or
```
npm start
```

And the project should start, but only for "local" mode.

It means that any DTN feature will not work.

## How to test the DTN features?

The first step is to clone [ud3tn repository](https://gitlab.com/d3tn/ud3tn).

Don't forget to clone with recursive submodules, if you forgot, just run: `git submodule update --init --recursive`.

After that, you will need to run **ud3tn** so that the database can use its aap interface to forward messages to another instance.

To run **ud3tn** the only thing you need to do is:

```
make clean && make posix && make run-posix
```

After running **ud3tn**, you need to run the amount of instances you want to synchronize.

In this case we will only create two instances, an instance A and an instance B, so we can run two instances of the CMS-Backend.

You can create two nodes like this on two different terminals:

```
build/posix/ud3tn --eid dtn://a.dtn \
                  --bp-version 7 \
                  --aap-port 4242 \
                  --cla "mtcp:*,4224"
```

```
build/posix/ud3tn --eid dtn://b.dtn \
                  --bp-version 7 \
                  --aap-port 4243 \
                  --cla "mtcp:*,4225"
```

After the instances are created, the only step left is to configure them.

You can configure instance A and B like this:

```
python tools/aap/aap_config.py --tcp localhost 4242 \
                               --dest_eid dtn://a.dtn \
                               --schedule 1 3600 100000 dtn://b.dtn mtcp:localhost:4225
```

```
python tools/aap/aap_config.py --tcp localhost 4243 \
                               --dest_eid dtn://b.dtn \
                               --schedule 1 3600 100000 dtn://a.dtn mtcp:localhost:4224
```

Finally, we need to run the two instances of the CMS, so we can communicate them using the DTN.

```
yarn start --http-port 2424 \
           --tcp-port 2525 \
           --dtn-port 4242 \
           --eid-list dtn://b.dtn/bundlesink \
           --mongo-host localhost \
           --mongo-port 27017 \
           --mongo-db cms-a
```

```
yarn start --http-port 2626 \
           --tcp-port 2727 \
           --dtn-port 4243 \
           --eid-list dtn://a.dtn/bundlesink \
           --mongo-host localhost \
           --mongo-port 27017 \
           --mongo-db cms-b
```

## Troubleshooting

### mongodb is installed but not running.

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
