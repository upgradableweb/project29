const nodemailer = require("nodemailer")
const fs = require("fs")
const path = require("path")
const moment = require("moment")
const EmailSchema = require("./EmailSchema")
const host = process.env.HOST
const user = process.env.MAIL
const pass = process.env.PASS

const from = `"Account Alerts"<${user}>`

const transporter = nodemailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: {
        user,
        pass
    },
});

const filePath = fileName => path.join(__dirname, fileName);

class EmailModule {
    sendingHtml = ""
    constructor({ to, subject }) {
        this.to = to
        this.subject = subject
    }

    async #modelIt({ type }) {

        // const date = moment().subtract(5, "minutes").toDate();
        // const count = await EmailSchema.countDocuments({ createdAt: { $gte: date } })

        // if (count == 5) {
        //     throw Error("time out please try after 5-10 mins")
        // }


        const options = {
            subject: this.subject,
            to: this.to,
            type,
            from
        }
        await new EmailSchema(options).save()
    }

    async send() {

        const options = {
            subject: this.subject,
            to: this.to,
            from,
            html: this.sendingHtml
        }
        const sent = await transporter.sendMail(options)
        console.log("Email Sent Successfully To:", this.to);
        return sent
    }

    async signin_alert({ browser, source, user_name, login_url }) {

        await this.#modelIt({ type: "signin_alert" })

        const time = moment().format("MM/YYYY hh:mm -A")
        const html = fs.readFileSync(filePath("./signin-alert.html"), "utf-8")
        this.sendingHtml = html
            .replace("{{browser}}", browser)
            .replace("{{source}}", source)
            .replace("{{time}}", time)
            .replace("{{user_name}}", user_name)
            .replace("{{login_url}}", login_url)

        return this.send()
    }

    async reset_password({ user_name, reset_password_link, login_url }) {

        await this.#modelIt({ type: "reset_password" })

        const html = fs.readFileSync(filePath("./reset-password.html"), "utf-8")
        this.sendingHtml = html
            .replace("{{login_url}}", login_url)
            .replace("{{user_name}}", user_name)
            .replace("{{reset_password_link}}", reset_password_link)

        return this.send()
    }

    async password_changed({ login_url, user_name }) {

        await this.#modelIt({ type: "password_changed" })

        const html = fs.readFileSync(filePath("./password_changed.html"), "utf-8")
        this.sendingHtml = html
            .replace("{{login_url}}", login_url)
            .replace("{{user_name}}", user_name)

        return this.send()
    }
}


module.exports = EmailModule