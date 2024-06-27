import { render } from '@testing-library/react';
import { Form } from 'antd';
import RecipientFormItems from '@/components/shared/RecipientFormItems';
import '../../matchMedia';

test('RecipientForm renders correctly', () => {
  const mockProps = {
    data: {
      fields: {
        title: '',
        firstName: '',
        lastName: '',
        message: '',
        email: '',
      },
      isValid: true,
      showEmail: true,
    },
    handleFieldChange: jest.fn(),
  };

  render(<Form><RecipientFormItems {...mockProps} /></Form>);

  expect(document.getElementById('recipientTitle')).toBeInTheDocument();
  expect(document.getElementById('recipientFistName')).toBeInTheDocument();
  expect(document.getElementById('recipientLastName')).toBeInTheDocument();
  expect(document.getElementById('recipientMessage')).toBeInTheDocument();
  expect(document.getElementById('recipientEmail')).toBeInTheDocument();
});

test('RecipientForm hides email field when showEmail is false', () => {
  const mockProps = {
    data: {
      fields: {
        title: '',
        firstName: '',
        lastName: '',
        message: '',
        email: '',
      },
      isValid: true,
      showEmail: false,
    },
    handleFieldChange: jest.fn(),
  };

  render(<Form><RecipientFormItems {...mockProps} /></Form>);

  expect(document.getElementById('recipientEmail')).toBeNull();
});
