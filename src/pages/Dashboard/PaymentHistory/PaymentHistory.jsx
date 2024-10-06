import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Button from "../../../components/Buttons/Button";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: payments=[]} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        }
    })
    return (
		<div>
			<div className="flex justify-between mb-8 ">
				<h2 className="text-3xl font-semibold">
					Total Payments: {payments.length}
				</h2>
			</div>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					{/* head */}
					<thead className="bg-[#f16f04b9]">
						<tr>
							<th>#</th>
							<th>Price</th>
							<th>Transaction ID</th>
							<th className="pl-12">Status</th>
						</tr>
					</thead>
					<tbody>
						{payments.map((payment, idx) => (
							<tr key={payment._id}>
								<td>{idx + 1}</td>
								<td>${payment.price}</td>
								<td>{payment.transactionId}</td>
								<td><Button>
									{payment.status}
								</Button></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentHistory;