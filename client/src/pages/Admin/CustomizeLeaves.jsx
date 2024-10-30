import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import CustomAlert from '../../components/CustomAlert';
import api from '../../axios';
import MaterialButton from '../../components/MaterialButton';
const CustomizeLeaves = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [payGradeData, setPayGradeData] = useState([]);
  const [selectedPayGrade, setSelectedPayGrade] = useState(1);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const res = await api.get('/paygrade', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (res.data.success) {
          setPayGradeData(res.data.data);
        } else {
          console.error('Failed to fetch leave data');
        }
      } catch (error) {
        console.error('Error fetching leave data names:', error);
      }
    };

    fetchLeaveData();

  }, []);

  const handlePayGradeSelect = (payGradeId) => {

    setSelectedPayGrade(payGradeId);
  };

  const handleSubmit = async () => {
    const selectedData = payGradeData.find((pg) => pg.PayGrade_ID === selectedPayGrade);
    console.log(selectedData);
    try {
      const res = await api.put(
        '/paygrade',
        { PayGradeId: selectedPayGrade, PayGradeData: selectedData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      if (res.data.success) {
        setAlertMessage('Leave allowances updated successfully!');
        setShowAlert(true);
      } else {
        console.error('Failed to update leave data');
      }
    } catch (error) {
      console.error('Error updating leave data:', error);
    }
  };

  return (
    <Layout>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="max-h-full h-full rounded-lg shadow-2xl shadow-black" style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <section className="bg-gray-950 px-4 py-5 backdrop-blur-md bg-opacity-75 min-h-full h-full rounded-lg" style={{ overflowY: 'auto' }}>
          <h2 className="text-5xl font-bold text-center mb-6 text-white">Customize Leave Allowances</h2>

          <div className="flex w-full  h-14 flex-row justify-start space-x-2 mb-4">
            {payGradeData.map((pg, index) => (

              <button
              

                key={pg.PayGrade_ID}
                onClick={() => handlePayGradeSelect(pg.PayGrade_ID)}
                className={`py-2 px-4 w-1/4 overflow-hidden text-lg border-2 scale-95 hover:scale-100 font-bold rounded-lg ${selectedPayGrade === pg.PayGrade_ID ? 'bg-teal-600 text-white hover:bg-teal-900' : ' text-gray-100 hover:bg-teal-900'}`}
                
              >
                Pay Grade {pg.PayGrade_ID}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py w-1/5 -3 border-b-2 rounded-tl-lg border-gray-200 bg-gray-500 text-center text-md font-semibold text-white uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 w-1/5 border-b-2 border-gray-200 bg-gray-500 text-center text-md font-semibold text-white uppercase tracking-wider">
                    Annual
                  </th>
                  <th className="px-6 py-3 w-1/5 border-b-2 border-gray-200 bg-gray-500 text-center text-md font-semibold text-white uppercase tracking-wider">
                    Casual
                  </th>
                  <th className="px-6 py-3 w-1/5 border-b-2 border-gray-200 bg-gray-500 text-center text-md font-semibold text-white uppercase tracking-wider">
                    Maternity
                  </th>
                  <th className="px-6 py-3 w-1/5 border-b-2 rounded-tr-lg border-gray-200 bg-gray-500 text-center text-md font-semibold text-white uppercase tracking-wider">
                    No Pay
                  </th>
                </tr>
              </thead>
              <tbody>
                {payGradeData.length > 0 && (
                  <tr className='min-w-full'>
                    <td className="px-6 py-4 border-b rounded-bl-lg border-gray-200 text-lg text-center w-1/5 " >Level {selectedPayGrade}</td>

                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="number"
                        min="0"
                        value={payGradeData[selectedPayGrade - 1]?.Annual || 0}
                        onChange={(e) => {
                          const updatedData = [...payGradeData];
                          updatedData[selectedPayGrade - 1].Annual = parseInt(e.target.value) || 0;
                          setPayGradeData(updatedData);
                        }}
                        className="w-full p-2 border border-gray-300 rounded text-center text-md"
                      />
                    </td>

                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="number"
                        min="0"
                        value={payGradeData[selectedPayGrade - 1]?.Casual || 0}
                        onChange={(e) => {
                          const updatedData = [...payGradeData];
                          updatedData[selectedPayGrade - 1].Casual = parseInt(e.target.value) || 0;
                          setPayGradeData(updatedData);
                        }}
                        className="w-full p-2 border border-gray-300 rounded text-center text-md"
                      />
                    </td>

                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="number"
                        min="0"
                        value={payGradeData[selectedPayGrade - 1]?.Maternity || 0}
                        onChange={(e) => {
                          const updatedData = [...payGradeData];
                          updatedData[selectedPayGrade - 1].Maternity = parseInt(e.target.value) || 0;
                          setPayGradeData(updatedData);
                        }}
                        className="w-full p-2 border border-gray-300 rounded text-center text-md"
                      />
                    </td>

                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="number"
                        min="0"
                        value={payGradeData[selectedPayGrade - 1]?.No_Pay || 0}
                        onChange={(e) => {
                          const updatedData = [...payGradeData];
                          updatedData[selectedPayGrade - 1].No_Pay = parseInt(e.target.value) || 0;
                          setPayGradeData(updatedData);
                        }}
                        className="w-full p-2 border border-gray-300 rounded text-center text-md"
                      />
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          <div className="flex justify-end mt-6">
            <MaterialButton
              table="Save Changes"
              index="1"
              onClick={handleSubmit}
              
            >
              
            </MaterialButton>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CustomizeLeaves;
