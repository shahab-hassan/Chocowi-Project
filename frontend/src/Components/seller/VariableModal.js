import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

const VariableModal = ({ onClose, onSave, presetVariables }) => {
  const [variable, setVariable] = useState({
    name: '',
    options: [{ name: '', price: '' }]
  });

  const handleAddOption = () => {
    if (variable.options.length < 6) {
      setVariable({
        ...variable,
        options: [...variable.options, { name: '', price: '' }]
      });
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = variable.options.filter((_, i) => i !== index);
    setVariable({
      ...variable,
      options: newOptions
    });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = variable.options.map((option, i) => {
      if (i === index) {
        return { ...option, [field]: value };
      }
      return option;
    });
    setVariable({
      ...variable,
      options: newOptions
    });
  };

  const handleSave = () => {
    if (variable.name && variable.options.some(opt => opt.name && opt.price)) {
      onSave(variable);
      onClose();
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h3 className="modalTitle">Add custom variable</h3>
          <button className="closeButton" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="presetButtons">
          {presetVariables.map((preset) => (
            <button
              key={preset}
              className="presetButton"
              onClick={() => setVariable({ ...variable, name: preset })}
            >
              {preset}
            </button>
          ))}
        </div>

        <div className="dividerText">OR</div>

        <input
          type="text"
          className="inputField"
          placeholder="Write a Custom Variable Name"
          value={variable.name}
          onChange={(e) => setVariable({ ...variable, name: e.target.value })}
        />

        <div className="variableOptions">
          {variable.options.map((option, index) => (
            <div key={index} className="optionGroup">
              <input
                type="text"
                className="inputField"
                placeholder="Option name"
                value={option.name}
                onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
              />
              <input
                type="number"
                className="inputField"
                placeholder="Price"
                value={option.price}
                onChange={(e) => handleOptionChange(index, 'price', e.target.value)}
              />
              {index > 0 && (
                <button
                  className="removeOptionButton"
                  onClick={() => handleRemoveOption(index)}
                >
                  <Minus size={20} />
                </button>
              )}
            </div>
          ))}

          {variable.options.length < 6 && (
            <button className="addOptionButton" onClick={handleAddOption}>
              <Plus size={16} />
              Add Option
            </button>
          )}
        </div>

        <button className="primaryBtn" onClick={handleSave}>
          Save Variable
        </button>
      </div>
    </div>
  );
};

export default VariableModal;