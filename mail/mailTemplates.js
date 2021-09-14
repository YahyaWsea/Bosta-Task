const confirmationMailBody = ({ name, confirmationCode }) => `</div>
            <h1>Email Verivication</h1>
            <h2>Dear ${name}</h2>
            <p>Please cmplete your signup by clicking the url to confirm your email</p>
            <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`;

const urlStatusMailBody = ({ name, url, currentStatus }) => `</div>
            <h1>Url Status alert</h1>
            <h2>For check: ${name}, url: ${url}</h2>
            <p>The above check is currently ${currentStatus}</p>
        </div>`;

module.exports = { confirmationMailBody, urlStatusMailBody };
