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

import { email, required } from "./modules/form/validation";
import MenuItem from "@mui/material/MenuItem";

import Link from "@mui/material/Link";
import FormFeedback from "./modules/form/FormFeedback";
import { signup } from "./config/ApiService";

function SignUpCorp() {
  const [sent, setSent] = React.useState(false);

  const userRole = [
    { label: "선택", value: "-" },
    { label: "개인회원", value: "customer" },
    { label: "기업회원", value: "seller" },
  ];

  const validate = (values) => {
    const errors = required(
      ["username", "password", "phoneNo", "nickname", "businessNo"],
      values
    );

    return errors;
  };

  const handleSubmit = (values) => {
    values["memberType"] = "C";
    values["memberStatus"] = "WAITING";
    values["email"] = "test";
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
            기업회원가입
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
              <Grid container spacing={2}></Grid>
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="businessNo"
                autoComplete="사업자등록번호"
                label="사업자등록번호"
                margin="normal"
              />
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="아이디"
                margin="normal"
                name="username"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="비밀번호"
                type="password"
                margin="normal"
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="nickname"
                autoComplete="이름"
                label="이름"
                margin="normal"
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="phoneNo"
                autoComplete="휴대폰번호"
                label="휴대폰 번호"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "가입 요청하기"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUpCorp);
