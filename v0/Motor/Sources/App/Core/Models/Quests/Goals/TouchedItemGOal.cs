using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Items;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

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
        public TouchedItemGoal(int itemId, IQuest quest): base(quest)
        {
            if (itemId <= 0)
            {
                throw new ArgumentNullException("id");
            }
            this.ItemToTouchId = itemId;
        }
        #endregion

        #region Public methods
        public override bool Evaluate()
        {
            this.IsAchieved = this.ItemIsTouched;
            return base.Evaluate();
        }
        #endregion

        #region Internal methods
        protected override void DoInitialize()
        {
            this._uiEvents = this.GetRootNode<ItemsEvents>();
            this._uiEvents.AttachItemIsTouched(this, nameof(OneItemIsTouched));
        }

        private void OneItemIsTouched(BaseItem item)
        {
            this.ItemIsTouched = false;
            if (this.ItemToTouchId == item.Id)
            {
                this.ItemIsTouched = true;
                this.Evaluate();
            }
        }
        #endregion

        #region Properties
        public bool ItemIsTouched { get => _itemIsTouched; private set => _itemIsTouched = value; }
        public int ItemToTouchId { get => _itemToTouchId; set => _itemToTouchId = value; }
        #endregion
    }
}
