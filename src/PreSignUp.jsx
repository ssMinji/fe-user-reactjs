import * as React from "react";
import Grid from "@mui/material/Grid";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import Typography from "./modules/components/Typography";
import withRoot from "./modules/withRoot";
import { Field, Form, FormSpy } from "react-final-form";
import { Box } from "@mui/system";
import FormButton from "./modules/form/FormButton";
import RFTextField from "./modules/form/RFTextField";
import Button from "./modules/components/Button";

import { email, required } from "./modules/form/validation";
import MenuItem from "@mui/material/MenuItem";

import Link from "@mui/material/Link";
import FormFeedback from "./modules/form/FormFeedback";
import { signup } from "./config/ApiService";

function PreSignUp() {
  const [sent, setSent] = React.useState(false);

  const userRole = [
    { label: "선택", value: "-" },
    { label: "개인회원", value: "customer" },
    { label: "기업회원", value: "seller" },
  ];

  const validate = (values) => {
    const errors = required(
      ["userRole", "firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = (values) => {
    signup(values).then((response) => {
      console.log("sign-up end : " + response);
      window.location.href = "/sign-in";
    });

    setSent(true);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            회원가입
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/premium-themes/onepirate/sign-in/" underline="always">
              이미 계정이 있다면, 바로 로그인하러가기
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Button
                color="secondary"
                variant="contained"
                size="large"
                component="a"
                href="/sign-up/in"
                sx={{ minWidth: 200 }}
              >
                개인회원
              </Button>
              <Button
                color="info"
                variant="contained"
                size="large"
                component="a"
                href="/sign-up/c"
                sx={{ minWidth: 200, m: 3 }}
              >
                기업회원
              </Button>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(PreSignUp);
