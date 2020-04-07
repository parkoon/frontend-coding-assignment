const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BANKS = [
  {
    code: "S01",
    name: "신한은행",
  },
  {
    code: "S02",
    name: "새마을금고",
  },
  {
    code: "J01",
    name: "조흔은행",
  },
  {
    code: "K01",
    name: "국민은행",
  },
  {
    code: "J02",
    name: "제일은행",
  },
  {
    code: "K03",
    name: "케이뱅크",
  },
  {
    code: "K06",
    name: "카카오뱅크",
  },
  {
    code: "H07",
    name: "하나은행",
  },
  {
    code: "NH01",
    name: "NH농협",
  },
];
app.get("/api/v1/account", (req, res) => {
  const { no } = req.query;

  if (no.length < 8 || no.length > 12) {
    res.json({ success: false, message: "유효하지 않는 계좌번호입니다." });
    return;
  }

  const banks = Array(no.length - 3)
    .fill(0)
    .map((n, i) => {
      let logo = `https://i.picsum.photos/id/${
        12 * Math.ceil(Math.random() * 9)
      }/100/100.jpg`;
      const { name, code } = BANKS[i];

      return {
        logo,
        name,
        code,
      };
    });

  res.json({
    success: true,
    banks,
  });
});

app.post("/api/v1/account", (req, res) => {
  const { body } = req;

  let errors = [];

  ["name", "code", "account"].map((key) => {
    if (!body.hasOwnProperty(key)) {
      errors.push(`유효하지 않은 요청입니다. ${key} 값을 확인해주세요.`);
      return;
    }

    if (
      key === "code" &&
      BANKS.findIndex((b) => b.code === body["code"]) === -1
    ) {
      errors.push(
        `유효하지 않은 요청입니다. ${body["code"]} 값을 확인해주세요.`
      );
    }

    if (key === "account" && body["account"].length !== 12) {
      errors.push(
        `유요하지 않은 요청입니다. (${body["account"]}) 12자리의 계좌를 입력해주세요.`
      );
    }
    return errors;
  });

  if (errors.length > 0) {
    res.json({
      success: false,
      errors,
    });
    return;
  }

  res.json({
    success: true,
    verification: Math.floor(1000 + Math.random() * 9000),
  });
});

app.get("/api/v1/verification", (req, res) => {
  const { code } = req.query;
  setTimeout(() => {
    if (Math.ceil(Math.random() * 9) < 6) {
      res.json({
        success: false,
        message: "인증 과정에 문제가 생겼습니다. 다시 시도해주세요",
      });
      return;
    }
    if (code && code.length === 4) {
      res.json({
        success: true,
        message: "인증이 완료되었습니다.",
      });
    } else {
      res.json({
        success: false,
        message: "유효하지 않은 코드입니다.",
      });
    }
  }, 3000);
});

server.listen(3030, () => {
  console.log(`Server is running on ${3030} port`);
});
