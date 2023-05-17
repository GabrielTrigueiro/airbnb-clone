'use client'

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";

import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();//state que guarda o estado do modal de registro
  const [isLoading, setIsLoading] = useState(false);

  //form object
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      password: '',
      email: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  },[loginModal, registerModal])

  //body do modal de Registro
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  );

  //footer do modal de registro
  const footerContent = (
    <div className="flex flex-col gap-5 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
            text-neutral-500
            text-center
            mt-4
            font-light
          "
      >
        <div className="justify-center flex flex-row items-center gap-1">
          <div>
            Already have an account?
          </div>
          <div
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}//o usuário não poderá alterar nada enquanto estiver carregando
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal