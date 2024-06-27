import { render } from '@testing-library/react';
import BookerInfoFormItems from '@/components/shared/BookerInfoFormItems';
import { Form } from 'antd';
import '../../matchMedia';

test('BookerInfoFormItems renders correctly', () => {
  const mockProps = {
    data: {
      fields: {
        title: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      },
    },
    handleFieldChange: jest.fn(),
  };

  render(<Form><BookerInfoFormItems {...mockProps} /></Form>);

  expect(document.getElementById('bookerTitle')).toBeInTheDocument();
  expect(document.getElementById('bookerFistName')).toBeInTheDocument();
  expect(document.getElementById('bookerLastName')).toBeInTheDocument();
  expect(document.getElementById('bookerEmail')).toBeInTheDocument();
});
