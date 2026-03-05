import { documentsMenuSuperadmin } from '@utils/super-admin/menus';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useState } from 'react';
import OfferLetter from './utils/offerletter';
import SalarySlipGenerator from './utils/salary-slip';

const DocumentsMenuForSuperadmin = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openModelName, setOpenModelName] = useState<string>('');
  const handleOpenModel = (modelName: { text: string }) => {
    setOpenModelName(modelName.text);
    open();
  };

  const openModal = (modalName: string) => {
    switch (modalName) {
      case 'OFFER LETTER':
        return <OfferLetter />;
      case 'SALARY SLIP':
        return <SalarySlipGenerator />;
      default:
        return <h1>Oops this is still in progress</h1>;
    }
  };

  return (
    <>
      <div className=" mx-auto w-full max-w-4xl p-10 bg-gradient-to-r from-blue-50 to-purple-100 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Documents
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {documentsMenuSuperadmin.map(menu => {
            const Icon = menu.icon;
            return (
              <div
                key={menu.text}
                onClick={() => handleOpenModel(menu)}
                className="relative group hover:cursor-pointer bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>

                <div className="flex justify-center items-center mb-4 p-3 rounded-full bg-indigo-100 text-indigo-600 shadow-md">
                  <Icon className="text-3xl" />
                </div>
                <h1 className="text-xl font-semibold text-gray-700">
                  {menu.text}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      <Modal size="lg" opened={opened} onClose={close}>
        {openModal(openModelName)}
      </Modal>
    </>
  );
};

export default DocumentsMenuForSuperadmin;
