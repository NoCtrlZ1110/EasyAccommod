
const rules = {
  userNameOrEmailAddress: [
    {
      required: true,
      message: ('ThisFieldIsRequired'),
    },
  ],
  password: [{ required: true, message: ('ThisFieldIsRequired') }],
};

export default rules;
