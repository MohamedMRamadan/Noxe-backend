export const html_emailVerify = (opt) => {
  return `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div
      style="
        width: 85%;
        margin: auto;
        color: #2a2a2a;
        padding: 50px 0;
        text-align: center;
      "
    >
      <div style="width: 100%; margin: 20px 0">
        <img
          src="https://s3.envato.com/files/295763048/03_preview.jpg"
          style="max-width: 590px; width: 100%; border-radius: 16px"
        />
      </div>
      <div class="msg" style="margin-left: 10px">
        <h2 style="text-transform: capitalize">
          Hi ${opt.firstName} ${opt.lastName}
        </h2>
        <p>
         That's Awesome!! , thank you for your registering an account with Noxe<br />
         Before we get started we'll need to verify your email. <br />
         By clicking into this button 
        </p>
      </div>
        <div>
          <a
            target="_blank"
            style="
              padding: 16px 20px;
              background-color: #2a2a2a;
              color: white;
              font-weight: bold;
              border-radius: 6px;
              display: block;
              width: fit-content;
              margin: 25px auto;
              text-decoration : none;
            "
            href="http://localhost:3000/password/verify/?u=${opt.id}&fi=default_verify&tk=${opt.token}"
            >Verify</a
          >
        </div>
    </div>
  </body>
</html>

`;
};
export const html_resetPassword = (opt) => {
  return `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div
      style="
        width: 85%;
        margin: auto;
        color: #2a2a2a;
        padding: 50px 0;
        text-align: center;
      "
    >
      <div style="width: 100%; margin: 20px 0">
        <img
          src="https://s3.envato.com/files/295763048/03_preview.jpg"
          style="max-width: 590px; width: 100%; border-radius: 16px"
        />
      </div>
      <div class="msg" style="margin-left: 10px">
        <h2 style="text-transform: capitalize">
          Hi ${opt.firstName} ${opt.lastName}
        </h2>
        <p>
          We received a request to reset you<br />
          Noxe password<br />
          Enter the following Password reset code
        </p>
      </div>
      <div>
        <p
          style="
            border: 2px solid #2a2a2a;
            width: fit-content;
            padding: 10px 20px;
            font-size: 1.5rem;
            font-weight: bold;
            border-radius: 10px;
            background-color: aliceblue;
            margin: auto;
          "
        >
          ${opt.code}
        </p>
        <p>Alternatively you can directly change your password</p>
        <div>
          <a
            target="_blank"
            style="
              padding: 16px 20px;
              background-color: #2a2a2a;
              color: white;
              font-weight: bold;
              border-radius: 6px;
              display: block;
              width: fit-content;
              margin: 25px auto;
              text-decoration : none;
            "
            href="http://localhost:3000/password/recover/?u=${opt.id}&fi=default_recover&tk=${opt.token}"
            >Change your Password</a
          >
        </div>
      </div>
    </div>
  </body>
</html>

`;
};
