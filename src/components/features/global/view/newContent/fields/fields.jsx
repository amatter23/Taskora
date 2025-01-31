/**
 * A component that renders a collection of selection fields for various attributes
 *
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.onDateSelect - Callback function when a date is selected
 * @param {Function} props.onStatusSelect - Callback function when a status is selected
 * @param {Function} props.onTagSelect - Callback function when a tag is selected
 * @param {Function} props.onColorSelect - Callback function when a color is selected
 * @param {string} props.type - Type of content being created, determines if ColorSelect is shown
 * @returns {JSX.Element} A div containing various selection components
 *
 * @example
 * <Fields
 *   onDateSelect={(date) => handleDateSelect(date)}
 *   onStatusSelect={(statusId) => handleStatusSelect(statusId)}
 *   onTagSelect={(tagId) => handleTagSelect(tagId)}
 *   onColorSelect={(color) => handleColorSelect(color)}
 *   type="project"
 * />
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
      />
      <TagSelect
        onTagSelect={data => {
          onTagSelect(data.uuid);
        }}
        Type={ButtonSelect}
      />
      {type === 'project' ? (
        <ColorSelect
          onColorSelect={data => {
            onColorSelect(data);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Fields;
