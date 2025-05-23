import React, { useImperativeHandle, forwardRef} from 'react';
import { Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import style from "./component.module.scss"
import { useForm } from '@mantine/form';

interface ChildRef {
    openModal: () => void;
}

interface Props {
    filterUsers: (val: { orgName: string; userName: string; }) => void
}

const FilterOptions = forwardRef<ChildRef, Props>((props, ref) => {
    const { filterUsers } = props;
    const [opened, { open, close }] = useDisclosure(false);

    // Function to open the modal
    const openModal = () => {
        open();
    };

    // Expose the openModal function to the parent component
    useImperativeHandle(ref, () => ({
        openModal
    }));

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { orgName: '', userName: '' },
    });


    const subMitMessage = async (values: { orgName: string; userName: string; }) => {
        filterUsers({ orgName: values.orgName, userName: values.userName })
        form.reset();
        close()
    }


    return (
        <Modal opened={opened} onClose={close} yOffset="10vh" size={'lg'} transitionProps={{ transition: 'rotate-left' }} title="Filter Options">
            <>
                <form className={style['contact_form']}
                    onSubmit={form.onSubmit(subMitMessage)}
                >
                    <div className={`${style['input_field_mini']} helvetica_neue_light`}>
                        <TextInput
                            label={'Organization name'}
                            placeholder="--Organization name--"
                            {...form.getInputProps('orgName')}
                        />
                    </div>

                    <div className={`${style['input_field_mini']} helvetica_neue_light !w-full`}>
                        <TextInput
                            label={'username'}
                            placeholder="--Username--"
                            {...form.getInputProps('userName')}
                        />
                    </div>

                    <div className='flex justify-end w-full mt-0 md:mt-0'>
                        <div data-property-1="Active" className={`${style['right_btn_wrapper']} inter_font`}>
                            <button
                                // onClick={() => goToPage('/getQuote')} 
                                className={`${style['right_btn']} w-full`}>Filter</button>
                        </div>
                    </div>
                </form>
            </>
        </Modal >
    );
});

FilterOptions.displayName = 'FilterOptions';

export default FilterOptions;
