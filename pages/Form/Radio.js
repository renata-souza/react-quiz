import React from 'react';

const Radio = ({ id, pergunta, options, value, active, onChange }) => {
  if (active === false) return null
  return (
    <>
      <fieldset>
        <legend><h2>{pergunta}</h2></legend>
        {options?.map((option) => (
          <label key={option}>
            <input
              type="radio"
              id={id}
              value={option}
              checked={value === option}
              onChange={onChange}
            />
            {option}
          </label>
        ))}
      </fieldset>
    </>
  );
};

export default Radio;
