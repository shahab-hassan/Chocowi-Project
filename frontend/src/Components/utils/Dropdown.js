import React from 'react';
import Select from 'react-select';

const Dropdown = ({ options, value, onChange , placeholder }) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
    }),
    control: (provided, state) => ({
      ...provided,
      padding: '6px',
      borderRadius: 'none',
      border: state.isFocused ? '1px solid black' : '1px solid #ccc',
      fontSize: '14px',
      backgroundColor: 'white',
      color: 'black',
      width: '100%',
      cursor: 'pointer',
      outline: 'none',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 15px center',
      backgroundSize: '10px',
      boxShadow: state.isFocused ? '0 0 0 1px black' : 'none',
    }),
    menu: (provided) => ({
      ...provided,
      padding: '10px',
      backgroundColor: '#fff',
      position: 'absolute',  
      zIndex: 9999,        
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
      color: 'black',
      cursor: 'pointer',
      padding: '10px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e0e0e0',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'black',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'black',
      ':hover': {
        backgroundColor: 'transparent', 
        color: 'black',
      },
    }),
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      styles={customStyles}
      menuPlacement="auto" 
      menuPosition="fixed" 
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          primary25: '#f0f0f0',
          primary: 'black', 
        },
      })}
    />
  );
};

export default Dropdown;
