import React from 'react'
import './ProgressSteps.css'

const steps = [
  { id: 1, title: 'Login' },
  { id: 2, title: 'CRUD' },
  { id: 3, title: 'Pagination' },
  { id: 4, title: 'Errors' },
  { id: 5, title: 'Testing' },
]

const currentStep = 5

const ProgressSteps = () => {
  return (
    <div className="steps-container">
      <h3 className="steps-header">
        المرحلة 10 : Finalization
        <span className="active-dot"></span>
      </h3>

      <ul className="steps-list">
        {steps.map(step => (
          <li
            key={step.id}
            className={`step-item ${
              step.id === currentStep ? 'active' : ''
            }`}
          >
            <span className="step-number">{step.id}</span>
            {step.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProgressSteps
