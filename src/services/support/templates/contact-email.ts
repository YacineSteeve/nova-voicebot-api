interface ContactEmailTemplateOptions {
    name: string;
    email: string;
    content: string;
    subject: string;
}

const contactEmailTemplate = (options: ContactEmailTemplateOptions): string => {
    return `
        <div>
            <h2>${options.name} has sent you a message</h2>
            <p>
                <b><u>Email:</u> </b>
                <span>${options.email}</span>
            </p>
            <p>
                <b><u>Subject:</u> </b>
                <span>${options.subject}</span>
            </p>
            <h4><u>Message:</u></h4>
            <p>
                ${options.content}
            </p
            <br />
            <hr />
            <p>
                <a href="https://www.nova.com">Nova Voice Bot</a>
            </p>
        </div>
    `;
};

export default contactEmailTemplate;
