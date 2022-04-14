import PropTypes from 'prop-types';
import { FormLabel, Stack, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const LabelRender = ({ label, tooltip, labelPosition, required, labelSx, labelProps }) => {
  if (!label) {
    return <></>;
  }
  return (
    <FormLabel
      sx={{
        mb: labelPosition === 'top' ? '4px' : undefined,
        ...(labelSx || {}),
      }}
      {...(labelProps || {})}
    >
      <Stack direction='row' alignItems='center'>
        <span>
          {required && (
            <span style={{ color: 'red' }}>
              *&nbsp;
            </span>
          )}
          { label }
          &nbsp;
        </span>
        { !!tooltip && (
          <Tooltip
            title={tooltip}
            arrow
            placement='top'
          >
            <HelpOutlineIcon
              fontSize='small'
            />
          </Tooltip>
        )}
      </Stack>
    </FormLabel>
  );
};

LabelRender.propTypes = {
  label: PropTypes.node,
  tooltip: PropTypes.node,
  required: PropTypes.bool,
  labelSx: PropTypes.object,
  labelProps: PropTypes.object,
  labelPosition: PropTypes.oneOf([ 'top', 'border' ]),
};

export default LabelRender;
