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
        private UIEvents _uiEvents = null;
        private BaseItem _itemToTouch = null;
        private bool _itemIsTouched = false;
        #endregion

        #region Constructors
        public TouchedItemGoal(BaseItem item)
        {
            this._itemToTouch = item;
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
            this._uiEvents = this.GetNode<UIEvents>("/root/UIEvents");
            this._uiEvents.AttachItemIsTouched(this, nameof(OneItemIsTouched));
        }

        private void OneItemIsTouched(BaseItem item)
        {
            this._itemIsTouched = false;
            if (this._itemToTouch == item)
            {
                this._itemIsTouched = true;
                this.Evaluate();
            }
        }
        #endregion
    }
}
