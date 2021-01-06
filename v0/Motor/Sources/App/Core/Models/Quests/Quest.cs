﻿using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Quests
{
    /// <summary>
    /// Represents a quest in the game.
    /// Quest has a list of goals (steps) to achieve
    /// </summary>
    public class Quest : Node, IQuest
    {
        #region Fields
        private DateTime _lastActivation;
        private bool _isActive = false;
        private bool _isMain = true;
        private List<IGoal> _goalList = new List<IGoal>();
        private QuestEvents _questEvents = null;
        #endregion

        #region Constructors
        public Quest(int id, string name, string description, bool isMain = true)
        {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this._isMain = isMain;
            this.Rewards = new List<IQuestReward>();
        }

        public Quest(string name, string description, bool isMain = true) : this(0, name, description, isMain)
        {}

        public Quest(string name, bool isMain = true) : this(name, "", isMain)
        {}

        public Quest(bool isMain = true) : this("", isMain)
        {}

        public Quest() : this(true)
        {}
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this._questEvents = this.GetNode<QuestEvents>("/root/QuestEvents");
        }

        public void EvaluateAchievment()
        {
            if (this.IsAchieved)
            {
                this._questEvents.BeQuestIsDone(this);
            }
        }

        /// <summary>
        /// Defines quest is active
        /// </summary>
        public void Activate()
        {
            this._isActive = true;
        }

        /// <summary>
        /// Quest is not active for now
        /// </summary>
        public void Deactivate()
        {
            this._isActive = false;
        }

        public void Add(IGoal item)
        {
            this.AddChild(item as Node);
            this._goalList.Add(item);
        }

        /// <summary>
        /// Adds goals 
        /// </summary>
        /// <param name="items"></param>
        public void Add(params IGoal[] items)
        {
            foreach (var item in items)
            {
                this.Add(item);
            }
        }

        public void Clear()
        {
            this._goalList.ForEach(item => this.RemoveChild(item as Node));
            this._goalList.Clear();
        }

        public bool Contains(IGoal item)
        {
            return this._goalList.Contains(item);
        }

        public void CopyTo(IGoal[] array, int arrayIndex)
        {
            this._goalList.CopyTo(array, arrayIndex);
        }

        public IEnumerator<IGoal> GetEnumerator()
        {
            return this._goalList.GetEnumerator();
        }

        public int IndexOf(IGoal item)
        {
            return this._goalList.IndexOf(item);
        }

        public void Insert(int index, IGoal item)
        {
            this._goalList.Insert(index, item);
            this.AddChild(item as Node);
        }

        public bool Remove(IGoal item)
        {
            bool isRemoved = this._goalList.Remove(item);

            if (isRemoved)
            {
                this.RemoveChild(item as Node);
            }

            return isRemoved;
        }

        public void RemoveAt(int index)
        {
            IGoal item = this[index];

            this._goalList.RemoveAt(index);
            this.RemoveChild(item as Node);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this._goalList.GetEnumerator();
        }

        public void AddRewards(params IQuestReward[] rewards)
        {
            foreach (var item in rewards)
            {
                this.Rewards.Add(item);
            }
        }
        #endregion

        #region Properties
        /// <summary>
        /// Id of the quest
        /// </summary>
        public int Id { get; set; }

        public IGoal this[int index] { get => this._goalList[index]; set => this._goalList[index] = value; }

        public int Count => this._goalList.Count;

        public bool IsReadOnly => false;

        /// <summary>
        /// Is all goals are achieved ?
        /// </summary>
        public bool IsAchieved => this._goalList.All(item => item.IsAchieved);

        /// <summary>
        /// Main quest or secondary
        /// </summary>
        public bool IsMain => this._isMain;

        /// <summary>
        /// Description of th quest
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Rewards list
        /// </summary>
       public IList<IQuestReward> Rewards { get; private set; }

        /// <summary>
        /// True if the quest is active
        /// </summary>
        public bool IsActive { get => this._isActive; }
        #endregion
    }
}
