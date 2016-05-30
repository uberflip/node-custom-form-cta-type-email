# Uberflip Platform Samples: Custom Form CTA Type (Email)

## Introduction

This is a sample custom form CTA type for [Uberflip](http://www.uberflip.com/) that sends submitted CTA data by email.

This sample was built with the following tools and services:

* [Node.js](https://nodejs.org/)
* [Express](http://expressjs.com/)
* [liquid-node](https://www.npmjs.com/package/liquid-node), a port of Shopify's [Liquid Templating Engine](https://shopify.github.io/liquid/), to build the email body
* [SendGrid](https://sendgrid.com/) to send the email
* [Heroku](https://www.heroku.com/) to host the sample

If you don't know or don't use all of these tools and services, don't worry!  This sample is extremely simple, and changing it to use something else should be relatively straightforward.

## Disclaimer

This sample was written to demonstrate how to build custom form CTA types for [Uberflip](http://www.uberflip.com/). Its code is **not** fit for production and should **not** be used in a production application without careful review.  As an example of its unfitness for production, it makes no effort to authenticate the caller, and so could be used to spam the email addresses configured to receive CTA submissions. Don't let this happen to you!

## Getting Started

### Sign up for a SendGrid account and create an API key

[Sign up for a SendGrid account.](https://sendgrid.com/pricing)

> [SendGrid](https://sendgrid.com/) is a transactional email service used by many leading technology companies. SendGrid has a [free plan](https://sendgrid.com/pricing) that you can sign up for without a credit card and use to send up to 12,000 emails per month.  

When the account has been provisioned, [create an API key](https://app.sendgrid.com/settings/api_keys):

* Click "Create API Key" and then "General API Key".
* Under "Mail Send", check "FULL ACCESS".
* Click "Save".
* Click the API key to copy it to the clipboard.
* Paste the API key somewhere safe. 

> Once you close the dialog that's displaying the API key, you can't recover it.  If you lose it, you will need to recreate it.  Keep it somewhere safe.

### Sign up for a Heroku account

[Sign up for a Heroku account.](https://signup.heroku.com/)

> Heroku is a cloud Platform-as-a-Service (PaaS) popular with the open-source community. Heroku has a [free plan](https://www.heroku.com/pricing) that you can sign up for without a credit card and use to host small apps (limited to a single virtual server per app, running 18 hours/day, and sleeping after 30 minutes of inactivity).  

### Get the sample

Clone the sample from git:

```bash
git clone https://git.flyptech.com/platform-samples/node-custom-form-cta-type-email.git
cd node-custom-form-cta-type-email/
```

Install the dependencies:
```bash
npm install
```

(Recommended) Run the tests:
```bash
npm test
```

### Configure the sample

Edit [package.json](package.json)'s `config` object appropriately:

* `from`: The email address to send the email from.
* `to`: The email addresses to send the email to.
* `subject`: The email subject.

(Optional) Edit [body.liquid](body.liquid).

> See [Liquid Templating Engine](https://shopify.github.io/liquid/) for instructions on writing Liquid templates.

> [body.liquid](body.liquid) has access to all of the properties of the JSON object that is POSTed to `/cta-submitted` when a CTA is submitted:

> * `hub_id`: The hub ID.
* `hub_cta_id`: The CTA ID.
* `submit`
  * `url`: The URL of the page the CTA was submitted from.
  * `ip`: The IP address the CTA was submitted from.
  * `fields`: The fields in the CTA as an object.

> When iterating `fields`, `field[0]` contains the field's API name (e.g. `"first_name"`) and `field[1]` contains the field's value (e.g. `"Colin"`).  See [Allowed collection types](https://github.com/Shopify/liquid/wiki/liquid-for-designers#allowed-collection-types) in the Liquid documentation for more details.

### Deploy the sample to Heroku

Log into Heroku:
```bash
heroku login
```

Create an app for the sample:
```bash
heroku create
```
> See [Creating Apps from the CLI](https://devcenter.heroku.com/articles/creating-apps) for more details on creating apps.

Configure the app with your SendGrid API key:
```bash
heroku config:set API_KEY=YOUR.SENDGRID.API.KEY.HERE
```
> The sample stores the SendGrid API key in the `API_KEY` environment variable, set through Heroku's config vars, rather than in code to help ensure you don't accidentally commit your API key to a public repository.  See [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars) for more details on managing configuration.

> If you plan to run the sample locally using `heroku local`, you will need to set the `API_KEY` environment variable in the `.env` file.  The sample's `.gitignore` file should exclude `.env` from the repository, but be careful not to commit your API key to a public repository anyway.  See [Heroku Local](https://devcenter.heroku.com/articles/heroku-local) for more details on running apps locally and the `.env` file.

> If you plan to run the sample locally directly, without Heroku, you will need to set the `PORT` and `API_KEY` environment variables directly.  (Heroku sets `PORT` automatically.)

Deploy the app to Heroku:
```bash
git push heroku master
```

Note the URL the app was deployed at.

> The URL will look something like `https://good-luck-173590.herokuapp.com/`.  If the app was deployed correctly, you should see a message like `node-custom-form-cta-type-email listening on 52663` when you open the URL in your browser.

### Add the custom form CTA type in Uberflip

[Log into Uberflip](https://app.uberflip.com/) and add the custom form CTA type:

* Click your username at top right and then "Account Settings".
* Click "Custom Integrations".
* Click "Add" next to "Add a new Form CTA integration".
* Enter the following:
  * "Name": The name you want to give the custom form CTA type.
  * "On Submit": The URL the app was deployed at + `/cta-submitted` (e.g. `https://good-luck-173590.herokuapp.com/cta-submitted`)
* Click "Save Settings".

### Use the custom form CTA type in Uberflip

Use the new form CTA type as you would any of the built-in form CTA types.  When you submit the CTA, you should receive an email with the submission.

## Questions and Feedback

If you have questions about [Uberflip](http://www.uberflip.com/) APIs, webhooks, or other platform extension points, please email them to [platform@uberflip.com](mailto:platform@uberflip.com), and we'd be happy to answer them.  We'd also love to hear from you if you're building something interesting on our platform.  

If you have other questions about [Uberflip](http://www.uberflip.com/), or if you're a customer and want to open a support ticket, please contact us through our [normal support channels](http://www.uberflip.com/contact).

## License

Copyright (c) 2016 [Uberflip](http://www.uberflip.com/).

Released under the [MIT License](LICENSE).
