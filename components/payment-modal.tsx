import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { FaCreditCard, FaPaypal } from "react-icons/fa"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
}

export function PaymentModal({ isOpen, onClose, amount }: PaymentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Payment</ModalHeader>
        <ModalBody>
          <p className="mb-4">Total amount to pay: ${amount}</p>
          <div className="space-y-4">
            <Button color="primary" startContent={<FaCreditCard />} className="w-full">
              Pay with Credit Card
            </Button>
            <Button color="warning" startContent={<FaPaypal />} className="w-full">
              Pay with PayPal
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

