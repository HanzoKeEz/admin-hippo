import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'

import { StepPersonal } from './StepForm/StepPersonal'
import { FormStep } from './StepForm/FormStep'
import { StepFamily } from './StepForm/StepFamily'
import { FinalStep } from './StepForm/FinalStep'
import { StepBasicInfo } from './StepForm/StepBasicInfo'

const STEPS_COUNT = 4

type FormSteps = 1 | 2 | 3 | 4

export const Stepper = (): JSX.Element => {
	const [currentStep, setCurrentStep] = useState<FormSteps>(1)

	const handleNextStep = useCallback((): void => {
		const nextStep = (currentStep + 1) as FormSteps

		if (currentStep < STEPS_COUNT) setCurrentStep(nextStep)
	}, [currentStep])

	const handlePrevStep = useCallback((): void => {
		const prevStep = (currentStep - 1) as FormSteps

		if (currentStep > 1) setCurrentStep(prevStep)
	}, [currentStep])

	const getCurrentStep = useMemo((): JSX.Element => {
		const steps = {
			1: (
				<FormStep
					title='Customer Information'
					currentStep={currentStep}
					progress={0}
					onNext={handleNextStep}
					onPrev={handlePrevStep}
				>
					<StepBasicInfo />
				</FormStep>
			),
			2: (
				<FormStep
					title='Personal Information'
					currentStep={currentStep}
					progress={33}
					onNext={handleNextStep}
					onPrev={handlePrevStep}
				>
					<StepPersonal />
				</FormStep>
			),
			3: (
				<FormStep
					title='Family Information'
					currentStep={currentStep}
					progress={66}
					onNext={handleNextStep}
					onPrev={handlePrevStep}
				>
					<StepFamily />
				</FormStep>
			),
			4: (
				<FormStep
					title='Got it!'
					currentStep={currentStep}
					progress={100}
					onNext={handleNextStep}
					onPrev={handlePrevStep}
				>
					<FinalStep />
				</FormStep>
			),
		}

		return steps[currentStep]
	}, [currentStep, handleNextStep, handlePrevStep])

	return (
		<main className='my-2 mx-16 p-12 rounded-lg border	min-h-screen'>
			<div className='border-black border p-12 rounded-lg'>
				{getCurrentStep}
			</div>
		</main>
	)
}
