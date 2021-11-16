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

---

TODO: Update this readme xD

Term 1

```
make clean && make posix && make run-posix
```

Term 2

```
build/posix/ud3tn --eid dtn://a.dtn \
                  --bp-version 7 \
                  --aap-port 4242 \
                  --cla "mtcp:*,4224"
```

Term 3

```
build/posix/ud3tn --eid dtn://b.dtn \
                  --bp-version 7 \
                  --aap-port 4243 \
                  --cla "mtcp:*,4225"
```

Term 4

```
python tools/aap/aap_config.py --tcp localhost 4242 \
                               --dest_eid dtn://a.dtn \
                               --schedule 1 3600 100000 dtn://b.dtn mtcp:localhost:4225
```

And then:

```
python tools/aap/aap_send.py --tcp localhost 4242 dtn://b.dtn/bundlesink \
                              'Hello, world!'
```

```
python tools/aap/aap_send.py --tcp localhost 4242 dtn://b.dtn/bundlesink \
                              '{ "modelName": "Model_Name_Value", "prop1": "value123" }'
```
