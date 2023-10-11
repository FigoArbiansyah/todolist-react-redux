import PropTypes from 'prop-types'

const Input = (props) => {
  const {
    value, placeholder
  } = props;
  return (
    <input
      type="text"
      className='outline-none border rounded p-2 w-full bg-transparent placeholder:text-slate-300'
      placeholder={placeholder}
      value={value}
      {...props}
    />
  )
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default Input