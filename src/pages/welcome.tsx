import clsx from 'clsx';
import { useState } from 'react';

type WelcomeScreenStep = 'enter-name' | 'start-game';

export const Welcome = () => {
  const [nameInputValue, setNameInputValue] = useState<string>('');
  const [step, setStep] = useState<WelcomeScreenStep>('enter-name');

  const buttonEnabled = !!nameInputValue.trim();
  const inputLabel = step === 'enter-name' ? 'Name:' : 'Hello';

  const handleBlur = () => {
    const name = nameInputValue.trim();
    if (name) {
      setStep('start-game');
    } else {
      setStep('enter-name');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === 'Enter' && buttonEnabled) {
      handlePlay();
    }
  };

  const handlePlay = () => {
    if (buttonEnabled) {
      console.log(`${nameInputValue} Started the game!`); // TODO
    }
  };

  return (
    <section className="mx-auto flex h-svh w-full flex-col justify-between py-8 md:w-1/2 lg:w-1/3">
      <div className="flex flex-col gap-2">
        <h1 className="text-center">Click The Fox! Game</h1>
        <div className="grid w-full grid-cols-2 items-center [&>*]:text-xl">
          <label className="mr-2 text-right" htmlFor="name-input">
            {inputLabel}
          </label>
          <input
            id="name-input"
            className={clsx(
              'w-full resize-none rounded-lg p-1 px-2 focus:outline-yellow-600',
              step === 'enter-name' && 'yellow-border',
            )}
            value={nameInputValue}
            onChange={(e) => setNameInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <button
        disabled={!buttonEnabled}
        onClick={handlePlay}
        className="yellow-border rounded-lg bg-yellow-600 p-2 px-4 text-white disabled:bg-white disabled:text-black"
      >
        PLAY!
      </button>
    </section>
  );
};
