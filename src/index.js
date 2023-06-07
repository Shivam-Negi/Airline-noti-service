const express = require('express')

const { ServerConfig } = require('./config')

const apiRoutes = require('./routes')

const mailsender = require('./config/email-config');

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`successfully started the server on PORT : ${ServerConfig.PORT}`);
    try {
        const response = await mailsender.sendMail({
            from: ServerConfig.GMAIL_EMAIL,
            to: 'shibunegi122@gmail.com',
            subject: 'checking the service...',
            text: 'yeah it works !!'
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
});