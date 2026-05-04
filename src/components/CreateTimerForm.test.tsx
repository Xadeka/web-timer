import { vi, test, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { CreateTimerForm } from "./CreateTimerForm";

async function renderForm() {
  let handleSubmit = vi.fn();
  const testUtils = render(<CreateTimerForm onSubmit={handleSubmit} />);
  return {
    handleSubmit,
    minutesInput: await testUtils.findByTestId("input-minutes"),
    secondsInput: await testUtils.findByTestId("input-seconds"),
    submitButton: await testUtils.findByTestId("button-create"),
    ...testUtils,
  };
}

let user: UserEvent;
let utils: Awaited<ReturnType<typeof renderForm>>;
beforeEach(async () => {
  user = userEvent.setup();
  utils = await renderForm();
});

test.each([
  [0, 12],
  [34, 0],
  [56, 18],
])("Can submit form with: %s minutes, %s seconds", async (minutes, seconds) => {
  await user.type(utils.minutesInput, String(minutes));
  await user.type(utils.secondsInput, String(seconds));
  await user.click(utils.submitButton);
  expect(utils.handleSubmit).toHaveBeenCalledOnce();
  expect(utils.handleSubmit.mock.calls.at(0)?.at(0)).toEqual({
    minutes,
    seconds,
  });
});

test("Cannot submit an empty form", async () => {
  await user.click(utils.submitButton);
  expect(utils.handleSubmit).not.toHaveBeenCalledOnce();
});

test.each([
  [-1, 0],
  [0, -1],
  [-1, -1],
  [0, 61],
  [61, 0],
  [61, 61],
  [61, -1],
  [-1, 61],
])(
  "Cannot submit invalid values: %s minutes, %s seconds",
  async (minutes, seconds) => {
    await user.type(utils.minutesInput, String(minutes));
    await user.type(utils.secondsInput, String(seconds));
    await user.click(utils.submitButton);
    expect(utils.handleSubmit).not.toHaveBeenCalledOnce();
  },
);
