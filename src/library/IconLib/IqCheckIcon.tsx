import clsx from 'clsx';
import React from 'react';

interface IqCheckIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const IqCheckIcon = ({ className }: IqCheckIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg
        width="92"
        height="24"
        viewBox="0 0 92 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="92" height="24" fill="url(#pattern0)" />
        <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use
              xlinkHref="#image0_75_746"
              transform="matrix(0.0100334 0 0 0.0384615 -0.00167224 0)"
            />
          </pattern>
          <image
            id="image0_75_746"
            width="92"
            height="26"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAaCAYAAABByvnlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABntJREFUeNrsWl1oHFUUvklXI41tNmq1pradlmqqpXairUItzS6CP9iaDVYEH+wu+KBS6AZ90KfNSh8EW7OR4pOw2/fqboiCIJJJUV+sOFG0La1kKvQH+sNqatGA1HOW76ZnLzvZmU2M/cmBye7OzL1z7/nO+c5376TpypUrat6uHYvwn6amputy8Pfu/CRGH3yoMwde6L9Gx2jRRxI/CzROry4gYnI2N8KnjQ7K0zwsCofwvd04PUqHS4czXVs/Gx3fmzhybrgbfcbEJYeO3tceG5V98vUMvvdfo3FjiTHyHOoDAhRHcK5HOGIDHSkfMNJ4UNS4pNuW6Z4sgZILMurDp/L9xy98uZPAsHxuiSHScjcyZTU3mIZ5+hgAGJxRcXI88147RzEiga8N4F5foxpmf/XrnvHDpwqZ3/86VQXGrQtuVx2LbLVxWbJyoN8bv4Ywr5HjepFeBUSj/m6CMSA4kYGYchIoqsQH3dePDErS97FamXLx8nhy+Gg6f3rCrTrPIKy/Z4ey2rfI097GZSn3pgAEziyJ8yWfzGBeT+NnnwTDNC6ydD9TXgKZUpIFjTIjefDnV/MXLp+oyoin799TAQR1aAic6+G3umkAQVFXmLymDs9QBbvF+SBc3gdAFLKqX9OUM/5eFRh3Llyjnl+bY1A4K7Ok/DyMyULGRum3W0+loB7qZ7KwqAukIU50u0D0iOfpMTJDuEHbiiDXddiNiGu6qGeFKsga6kVT1WCQh4EKS3AQi4V+AiNKxbt47PwXVWBs7xwoExi9HclPXWRU0mcCvUY2S6cWDWXG5yvqzE/xgVp3G+IkQ+cZ+JSfc+l6AnXUqnGNQekKAEYCY9aS2ImE1PzawtDHGACpRN+fk+cyX58ctCRNPbXm3XJLZFGcwGCn/YBJllHDRvHdBqh+zx6BU1PI8h7QawzXunzqYRr996Fv7mMnxlyke+Jmlon6qIXGkGjbHSIz8gKMVBVlBdTTOvLDqB1HD35v8ZfY0fOfpyf/uTR1sdt6q7y4pSNOFOXSIDUYLqLaM/qpR5NdIhMc6u8kotjmaJSZhQDTYJhOZ1FS1PWPrxtRnRF11BxTKSBF6gCaAiOs7LVmWrAeWhnJ/3j2YJWaWn1HLAswkoLDU/VqRa16ZdISnKXPmZG7W7SrlXVZvf5BndA2oB0fdI0VFIyG1yGN2OKFt6j7OsYsmR3rl77oEhg5sSBVKIqhFdU0Wav7so3zCZF5tfpzzcUuaEaDc6BBV+QxFhc0WVtlBTBXomxGI620k3e3PphZ3va4C5Xkysx6actKdez8h1XZYUWfkAPSDhuaoz0wbeP0Oyg72D7LhKCWEaJjsJbQCAOIZ0RMqRqQQh6KydrWuc8iNcV1oYztF/XsphY1Vr4qc1e1b/XoujOblNigOSHmPtMxammsdzEck5ojISiBeV531mMCwlsbBIritcVnx960d6z7eIRBIeWUYLpqXfzTVTYno0wypbPuu20u0aB5xUPcXp6OJQJYATSlxUvRVH9ha4h2YtIodOrRjmRf513PVL4zKLTws787foGLl7V57RIlt0d4S6TttmUln0iNzQEIjg99hcmmRsZ5ACDqQm5DejcMSEFESRGKoWJcnGOr3i7wIo+NF37NrcN29uWH1boVber0H1cBibYs52JuqqghMcjEHCRHSfB6YJYQ9JWZYUBoFZeW820O2ZEn0QUolgAl9dwD75c0KExhWx85oV55cqmS6mpJa6dTo++CEA75WqDIAJgFGxSyNl9HpprbQTpwirXGFGSceKEm52uFLepT6oIap6DHY1ApDlbUbZv6vrE+2vW6mliQqYBA1KU2r9hV1QetPcZ8uk+BVy2A7YrM2QDnxRuRxbWiFPPIg4ITyJqTYt1iI5JzxvxzWFQmMCbdrg0+4cDtDTCMXtQTve3T1dzgZAooRjk8PIYUTl+8NGm/sf+Mu63zg6mC9+1v+6v2rZTPWzM4ugtO8OCQDI6EqvO2rcF5xAFEFHt1GSFPvVrPpHZ9Pu3SCCavEcbhTG3if3KY6Tt1pCg7r6yjl3d0j5wbHjnk7atKX15/bF+ba4ckDrpmKM9GVoTYufXC7BSIdm4jr62lzQogfkZ9J74/XShyLdHGSiy++p3r878q5sAi/2XnBHSJQElN/H02r7fbF7Usnff6/wUIQCkQKN0ERBLS15l3+/S0MlfPsemI8Quqea/7278CDADx9+bBb4UsPgAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    </span>
  );
};

export default IqCheckIcon;
