using ladiagonaledupoulpe.Sources.App.Core.Models.Items;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Goals
{
    /// <summary>
    /// Use this class to reach goal when player has touched one item
    /// </summary>
    public class TouchedItemGoal : Goal
    {
        #region Fields
        private ItemsEvents _uiEvents = null;
        private int _itemToTouchId = 0;
        private bool _itemIsTouched = false;
        #endregion

        #region Constructors
        public TouchedItemGoal(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentNullException("id");
            }
            this._itemToTouchId = id;
        }
        #endregion

        #region Public methods
        public override bool Evaluate()
        {
            this.IsAchieved = this._itemIsTouched;
            return base.Evaluate();
        }
        #endregion

        #region Internal methods
        protected override void DoInitialize()
        {
            this._uiEvents = this.GetNode<ItemsEvents>("/root/ItemsEvents");
            this._uiEvents.AttachItemIsTouched(this, nameof(OneItemIsTouched));
        }

        private void OneItemIsTouched(BaseItem item)
        {
            this._itemIsTouched = false;
            if (this._itemToTouchId == item.Id)
            {
                this._itemIsTouched = true;
                this.Evaluate();
            }
        }
        #endregion
    }
}
