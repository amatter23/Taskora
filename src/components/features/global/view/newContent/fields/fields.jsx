/**
 * A component that renders selection fields for content attributes management
 *
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.onDateSelect - Callback function when a date is selected
 * @param {Function} props.onStatusSelect - Callback function when a status is selected
 * @param {Function} props.onTagSelect - Callback function when a tag is selected
 * @param {Function} props.onColorSelect - Callback function when a color is selected
 * @param {string} props.type - Content type ('project' or other)
 * @param {Object} props.defaultStatus - Default status data for StatusSelect
 * @param {string} props.defaultColor - Default color for ColorSelect
 * @returns {JSX.Element} Selection fields container
 */

import StatusSelect from '../../status/statusSelect/statusSelect';
import DateSelect from '../../date/dateSelect/dateSelect';
import TagSelect from '../../tags/tagSelect/tagSelect';
import ColorSelect from '../../color/colorSelect';
import ButtonSelect from '../../buttonSelect/buttonSelect';
import style from './fields.module.css';
const Fields = ({
  onDateSelect,
  onStatusSelect,
  onTagSelect,
  onColorSelect,
  type,
  defaultStatus,
  defaultColor,
}) => {
  return (
    <div className={style.fields}>
      <DateSelect
        Type={ButtonSelect}
        onDateSelect={data => {
          onDateSelect(data);
        }}
      />
      <StatusSelect
        onStatusSelect={data => {
          onStatusSelect(data.uuid);
        }}
        Type={ButtonSelect}
        data={defaultStatus}
      />
      <TagSelect
        onTagSelect={data => {
          onTagSelect(data.uuid);
        }}
        Type={ButtonSelect}
      />
      {type === 'project' ? (
        <ColorSelect
          width={'fit-content'}
          onColorSelect={data => {
            onColorSelect(data);
          }}
          data={defaultColor}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Fields;
