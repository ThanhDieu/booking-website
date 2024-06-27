import { render, screen } from '@testing-library/react';
import Steps from '@/components/shared/Steps';

test('Steps renders correctly', () => {
  const mockProps = {
    data: {
      steps: [
        { step: 1, title: 'Step 1', onClick: jest.fn(), enabled: true },
        { step: 2, title: 'Step 2', onClick: jest.fn(), enabled: false },
      ],
      activeStep: 1,
    },
  };

  render(<Steps {...mockProps} />);

  expect(screen.getByText('Step 1')).toBeInTheDocument();
  expect(screen.getByText('Step 2')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Step 1' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Step 2' })).toBeDisabled();
});

test('Steps calls onClick prop when step is clicked', () => {
  const mockProps = {
    data: {
      steps: [
        { step: 1, title: 'Step 1', onClick: jest.fn(), enabled: true },
        { step: 2, title: 'Step 2', onClick: jest.fn(), enabled: false },
      ],
      activeStep: 1,
    },
  };

  render(<Steps {...mockProps} />);

  const stepButton = screen.getByRole('button', { name: 'Step 1' });
  stepButton.click();

  expect(mockProps.data.steps[0].onClick).toHaveBeenCalledWith(1);
});
