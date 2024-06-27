import { render, screen } from '@testing-library/react';
import RadioInput from '@/components/shared/RadioInput';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

test('RadioInput renders correctly', () => {
  const mockProps = {
    data: {
      name: 'radio-input',
      title: 'Radio Input',
      subTitle: 'Choose an option:',
      selectedValue: 'option1',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
    },
    setSelectedValue: jest.fn(),
  };

  render(<RadioInput {...mockProps} />);

  expect(screen.getByText('Radio Input')).toBeInTheDocument();
  expect(screen.getByText('Choose an option:')).toBeInTheDocument();
  expect(screen.getByLabelText("Option 1")).toBeChecked();
});

test('RadioInput calls setSelectedValue prop when radio button is clicked', async () => {
  const mockProps = {
    data: {
      name: 'radio-input',
      title: 'Radio Input',
      subTitle: 'Choose an option:',
      selectedValue: 'option1',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
    },
    setSelectedValue: jest.fn(),
  };

  render(<RadioInput {...mockProps} />);

  const user = userEvent.setup();
  await user.click(screen.getByLabelText("Option 2"));

  expect(mockProps.setSelectedValue).toHaveBeenCalledWith('option2');
});
