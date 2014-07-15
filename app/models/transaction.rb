class Transaction < ActiveRecord::Base
  belongs_to :company
  belongs_to :subscription
  
  attr_accessor :company_domain, :subscription

  def purchase(amount,credit_card)
    amount = (amount*100).round
    response = GATEWAY.purchase(amount, credit_card, purchase_options)    
    if response.success?
       self.update_attributes(transaction_id: response.params["transaction_id"],card_number: credit_card.display_number)
       make_recurring(credit_card)
    end
   response.success?
  end
 
  private
  
  def purchase_options 
    if self.company.present?
       {
      :ip => ip_address,
      :billing_address => {
        :name     => self.company.name,
        :country  => self.company.country.name
      }
    }

    else

    {
      :ip => ip_address,
      :billing_address => {
        :name     => "Ryan Bates",
        :address1 => "123 Main St.",
        :city     => "Chennai",
        :state    => "TN",
        :country  => "India",
        :zip      => "600083"
      }
    }
   end
  end

  def make_recurring(credit_card)
    subscribe = Subscription.where("id = ?",self.subscription_id).first
    response_recurring=GATEWAY.recurring(subscribe.try(:amount), credit_card,
    :description => "Payment for #{subscribe.name}",
    :start_date => Date.tomorrow,
    :period => "Month",
    :frequency => subscribe.valid_log)
    self.update_attributes(profile_id: response_recurring.params["profile_id"]) if response_recurring.success?
    response_recurring.success?
  end
end