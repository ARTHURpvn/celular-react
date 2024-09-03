const Deposit = () => {

    return (
        <div className="pt-10 px-6">
            <p className="text-white"> Cancelar </p>

            <div>
                <form method="post" className="flex flex-col mt-10">
                    <label htmlFor="amount" className="font-semibold text-lg"> Digite a Quantidade <br/> Desejada </label>
                    <p className="text-gray-500 text-sm"> Valor Disponivel: <span className="text-white font-semibold"> R$ 100.000 </span> </p>
                    <input type="number" name="amount" placeholder="100.000"
                        className="w-full h-12 px-2 mt-6 rounded-xl bg-neutral-500/40"
                        required
                    />

                    <input type="button" value={"Confirmar"} className="self-end mt-6 p-2 rounded-xl bg-blue-600" />
                </form>
            </div>
        </div>
    )
}

export default Deposit